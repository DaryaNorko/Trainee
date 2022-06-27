using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WorkDirApp.Data;

namespace WorkDirApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FolderController : Controller
    {
        [HttpGet]
        public ActionResult<List<Folder>> GetLogicDisks()
        {
            List<Folder> logicDisks = new();

            DriveInfo[] allDrives = DriveInfo.GetDrives();

            if (allDrives.Length < 0) return BadRequest();

            foreach (var d in allDrives)
            {
                DirectoryInfo dir = new(d.Name);

                Folder folder = new Folder("Disc " + dir.Name[0]);

                folder.Path = dir.FullName;
                DirectoryInfo childrens = new(dir.FullName);

                if (childrens.GetDirectories().Length > 0)
                    folder.Expandable = true;

                logicDisks.Add(folder);
            }
            return logicDisks;
        }

        [HttpPost("selectFolder")]
        public ActionResult<List<Folder>> GetChildrenFoldersNext(NextPath nextPath)
        {
            List<Folder> folderList = new();

            if (Directory.Exists(nextPath.path))
            {
                DirectoryInfo dir = new(nextPath.path);
                DirectoryInfo[] folders = dir.GetDirectories();

                if (folders.Length < 0) return NoContent();

                foreach (var f in folders)
                {
                    Folder childrenFolder = new Folder(f.Name);

                    try
                    {
                        childrenFolder.Path = f.FullName;
                        DirectoryInfo childrens = new(f.FullName);

                        if (childrens.GetDirectories().Length > 0)
                            childrenFolder.Expandable = true;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        Console.WriteLine(ex.StackTrace);
                    }
                    folderList.Add(childrenFolder);
                }

                if (folderList.Count == 0) return NoContent();
                return folderList;
            }
            return BadRequest();
        }

        [HttpPost("appendDirectory")]
        public ActionResult AppendNewDirectory([FromForm] NewDirectory newDirectory)
        {
            if (Directory.Exists(newDirectory.path))
            {
                if (newDirectory.file.Length > 0)
                {
                    CreateDirectory(newDirectory);
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("clearAndCreateDirectory")]
        public ActionResult ClearAndCreateDirectory([FromForm] NewDirectory newDirectory)
        {

            if (Directory.Exists(newDirectory.path))
            {
                if (newDirectory.file.Length > 0)
                {
                    DirectoryInfo directory = new(newDirectory.path);
                    DirectoryInfo[] folders = directory.GetDirectories();

                    foreach (var folder in folders)
                    {
                        string path = Path.Combine(newDirectory.path, folder.Name);
                        Directory.Delete(path, true);
                    }
                    CreateDirectory(newDirectory);
                }
                return Ok();
            }
            return BadRequest();
        }

        private void CreateDirectory(NewDirectory newDirectory)
        {
            string file = string.Empty;
            using (var stream = newDirectory.file.OpenReadStream())
            {
                file = new StreamReader(stream).ReadToEnd();
                stream.Close();
            }

            var dirs = JsonConvert.DeserializeObject<UserDirectory>(file);

            FindAllDirectories(dirs, newDirectory.path);
        }

        private void FindAllDirectories(UserDirectory dirs, string path)
        {
            foreach (var dir in dirs)
            {
                string newFolder = Path.Combine(path, dir.Key);
                Directory.CreateDirectory(newFolder);

                if (dir.Value != null)
                    FindAllDirectories(dir.Value, newFolder);
            }
        }
    }
}