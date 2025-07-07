from django.contrib import admin
from .models import Product, Order,  OrderItem
# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_url:
            return f'<img src="{obj.image_url}" style="max-height: 100px;" />'
        return "No image"
    image_preview.allow_tags = True
admin.site.register(Order)
admin.site.register(OrderItem)