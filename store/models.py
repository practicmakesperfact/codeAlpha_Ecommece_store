from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    # For uploaded files
    image = models.ImageField(upload_to='products/', null=True, blank=True)  
    # For external URLs
    # external_image_url = models.URLField(blank=True, null=True)  
    
    def __str__(self):
        return self.name

    @property
    def image_url(self):
        if self.external_image_url:
            return self.external_image_url
        elif self.image:
            return self.image.url
        return None

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    
    @property
    def total(self):
        return sum(item.total for item in self.orderitem_set.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    
    @property
    def total(self):
        return self.product.price * self.quantity