from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()  # Changed from 'image' to 'image_url'

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            # Fallback for Codespaces
            host = self.context.get('host', 'localhost:8000')
            return f"http://{host}{obj.image.url}"
        return None

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'image', 'image_url']  # Include both

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, source='orderitem_set')
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'completed', 'items']