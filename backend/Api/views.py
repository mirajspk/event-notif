from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .serializers import EventSerializer , ClubsSerializer
from .models import Event , Clubs
from rest_framework.generics import ListAPIView # type: ignore
from rest_framework.views import APIView # type: ignore
# We can make a class based view with DRF's APIView
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from rest_framework import viewsets # type: ignore

class EventList(APIView):
    def post(self, request):
        serializer = EventSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
class ClubsView(APIView):
    def post(self, request):
        serializer = ClubsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        events = Clubs.objects.all()
        serializer = ClubsSerializer(events, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)