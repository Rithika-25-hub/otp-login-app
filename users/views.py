from django.shortcuts import render
import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer,VerifyCodeSerializer,EmailCheckSerializer


class RegisterView(APIView):

    def post(self, request):

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():

            login_code = str(random.randint(100000, 999999))

            user = User.objects.create(
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                email=serializer.validated_data['email'],
                login_code=login_code
            )

            return Response(
                {
                    "message": "User registered successfully",
                    "login_code": login_code
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    def generate_login_code():
        return str(random.randint(100000, 999999))


class CheckEmailView(APIView):

    def post(self, request):

        serializer = EmailCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        exists = User.objects.filter(
            email=email
        ).exists()

        return Response({
            "registered": exists
        })


class VerifyCodeView(APIView):

    def post(self, request):

        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        login_code = serializer.validated_data['login_code']

        try:
            user = User.objects.get(
                email=email,
                login_code=login_code
            )

            return Response(
                {
                    "authenticated": True,
                    "first_name": user.first_name,
                    "last_name": user.last_name
                },
                status=status.HTTP_200_OK
            )

        except User.DoesNotExist:

            return Response(
                {
                    "authenticated": False,
                    "message": "Invalid login code"
                },
                status=status.HTTP_400_BAD_REQUEST
            )