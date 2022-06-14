using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkDirApp.Controllers.Data;

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

            foreach (var d in allDrives) // переделать имя 
            {
                DirectoryInfo dir = new(d.Name);
                
                Folder folder = new Folder("Disc "+ dir.Name[0]);

                folder.Path = dir.FullName;
                DirectoryInfo childrens = new(dir.FullName);

                if (childrens.GetDirectories().Length > 0)
                    folder.Expandable = true;

                logicDisks.Add(folder);
            }

            return logicDisks;
        }

        [HttpPost("choseFolder")]
        public ActionResult<List<Folder>> GetChildrenFoldersNext(NextPath nextPath) //model
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
                    catch (Exception)
                    {

                    }

                    folderList.Add(childrenFolder);
                }

                if (folderList.Count == 0) return NoContent();
                return folderList;
            }

            return BadRequest();
        }

        [HttpPost("createDirectory")] //<List<Folder>>
        public ActionResult<string> CreateNewDirectory([FromForm]string path, string file){
            return path;
        }
    }
}