# store/migrations/0002_migrate_image_urls.py
from django.db import migrations

def migrate_images(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    for product in Product.objects.exclude(image=''):
        if 'pexels.com' in str(product.image):
            try:
                product.external_image_url = str(product.image).replace('https:/', 'https://')
                product.save(update_fields=['external_image_url'])  # Only update this field
            except Exception as e:
                print(f"Skipped product {product.id}: {e}")

class Migration(migrations.Migration):
    dependencies = [
        ('store', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(migrate_images),
    ]