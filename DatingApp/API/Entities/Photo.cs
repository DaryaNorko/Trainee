using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; } //создаем эти 2 свойства, чтобы сделать fully defining the relationship
        // То есть привязываем фото к конкретному юзеру. Когда удалим юзера, удалим и все его фото.
        public int AppUserId { get; set; }

    }
}