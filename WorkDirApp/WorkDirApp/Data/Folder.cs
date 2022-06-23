using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WorkDirApp.Data
{
    public class Folder
    {
        public string Name { get; set; }
        public int Level { get; set; }
        public bool Expandable { get; set; }
        public bool IsLoading { get; set; }
        public string Path { get; set; }
        public Folder[] Children { get; set; }
        

        public Folder(string name)
        {
            Name = name;
        }
    }
}