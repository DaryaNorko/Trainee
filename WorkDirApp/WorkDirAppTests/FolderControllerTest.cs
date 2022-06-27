using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using WorkDirApp.Controllers;

namespace WorkDirAppTests
{
    public class FolderControllerTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void dsf()
        {
            FormFile v = new();
            FolderController f = new();
            Assert.Pass();
        }
    }
}