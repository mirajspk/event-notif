# api/forms.py
from django import forms
from .models import Event
from datetime import date , timedelta

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            "name", "location", "date", "host", "type",
            "registration_link", "startTime", "description", "image"
        ]
        widgets = {
            "date": forms.DateInput(attrs={"type": "date", "min" : date.today().isoformat() }),
            "startTime": forms.TextInput(attrs={"placeholder": "e.g.11:11"}),
            "description": forms.Textarea(attrs={"rows": 4 ,"placeholder" : "Write the description of the event"}),
            "name" :forms.Textarea(attrs={"placeholder": "Enter event title" , "rows" :1}),
            "location" : forms.Textarea(attrs={"placeholder": "Enter Location", "rows":1 }),
            "registration_link" : forms.Textarea(attrs={"placeholder": "Enter Registration Link", "rows":1 }),
          
        }
