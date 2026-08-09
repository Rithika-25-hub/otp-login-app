from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]

    def validate_first_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "First name must contain at least 2 characters."
            )
        return value

    def validate_last_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Last name must contain at least 2 characters."
            )
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already registered."
            )
        return value

class EmailCheckSerializer(serializers.Serializer):
    email = serializers.EmailField()

    
class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    login_code = serializers.CharField(max_length=6)



    def validate_login_code(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                "Login code must contain only digits."
            )

        if len(value) != 6:
            raise serializers.ValidationError(
                "Login code must be exactly 6 digits."
            )

        return value