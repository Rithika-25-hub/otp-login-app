from rest_framework import serializers
from .models import Checkout


class CheckoutSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Checkout
        fields = [
            'id',
            'email',
            'phone',
            'shipping_address',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be 10 digits."
            )

        return value

    def validate_shipping_address(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Please enter a valid address."
            )

        return value