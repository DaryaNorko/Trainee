using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WorkDirApp.Data
{
        public class NewDirectory
        {
            public string path { get; set; }
            public IFormFile file { get; set; }
            public NewDirectory()
            {
                
            }
        }
}