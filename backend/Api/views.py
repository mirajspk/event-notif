from django.shortcuts import render
from django.urls import Resolver404
from rest_framework.compat import requests
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.schemas.coreapi import serializers
from .serializers import EventSerializer , ClubsSerializer
from .models import Event , Clubs
from rest_framework.generics import ListAPIView # type: ignore
from rest_framework.views import APIView # type: ignore
# We can make a class based view with DRF's APIView
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from rest_framework import viewsets # type: ignore

class EventList(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if not request.user.is_authenticated or request.user.user_type != 'ADMIN':
            return Response({'error': 'Admin access required'}, 
                          status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request):
        events = Event.objects.all().orderd_by('date')
        serializer = EventSerializer(events, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)



class RelatedEventsView(APIView):

    def get(self, request, host):
        events = Event.objects.filter(host=host).order_by('date')[:3]
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

   
class EventDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExit:
            return None

    def put(self, request, pk):
        if request.user.user_type != 'ADMIN':
            return Response({'error': 'Admin access required'}, 
                          status=status.HTTP_403_FORBIDDEN)

        event = self.get_object(pl)
        if not event:
            return Response({'error': 'Event not found'}, 
                          status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self,request, pk):
        if request.user.user_type != "ADMIN":
            return Response({'error': 'Admin Access Required'},
                            status=status.HTTP_403_FORBIDDEN)

        event = self.get_object(pk)
        if not event:
            return Response({'error': 'Event not found'}, 
                        status=status.HTTP_404_NOT_FOUND)

        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
