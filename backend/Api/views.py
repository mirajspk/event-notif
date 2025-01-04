from django.shortcuts import get_object_or_404
from django.shortcuts import render
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

    
    def put(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        event.delete()
        return Response({"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

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
    
    def put(self, request, pk):
        club = get_object_or_404(Clubs, pk=pk)
        serializer = ClubsSerializer(club, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        events = Clubs.objects.all()
        serializer = ClubsSerializer(events, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

   def delete(self, request, pk):
        club = get_object_or_404(Clubs, pk=pk)
        club.delete()
        return Response({"message": "Club deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
