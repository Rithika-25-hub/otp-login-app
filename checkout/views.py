from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from users.models import User
from .serializers import CheckoutSerializer


class CheckoutView(APIView):

    def post(self, request):

        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.pop('email')

        user = User.objects.filter(email=email).first()

        if not user:
            return Response(
                {"message": "User is not registered"},
                status=status.HTTP_400_BAD_REQUEST
            )

        checkout = serializer.save(user=user)

        return Response(
            {
                "message": "Checkout completed successfully",
                "checkout_id": checkout.id
            },
            status=status.HTTP_201_CREATED
        )