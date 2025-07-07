from django.db import migrations

def transfer_urls(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    for product in Product.objects.exclude(image=''):
        if 'pexels.com' in str(product.image):
            product.external_image_url = str(product.image).replace('https:/', 'https://')
            product.save(update_fields=['external_image_url'])

class Migration(migrations.Migration):
    dependencies = [
        ('store', '0004_remove_order_total_remove_orderitem_price_and_more'), 
    ]
    operations = [
        migrations.RunPython(transfer_urls),
    ]