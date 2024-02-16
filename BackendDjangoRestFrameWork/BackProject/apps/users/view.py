from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import UserSerializerToken
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset =  UserSerializer.Meta.model.objects.all()

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serealizer = UserSerializerToken(request.user)
        return Response(serealizer.data)