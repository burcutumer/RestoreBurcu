using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{   //An 'owned' property means that is owned by another property.
    //This 'owned' property will not have its own table in the DB (nor does it need to be given an ID)
    // but the properties of this object will be in the same table as the entity that owns it.
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}