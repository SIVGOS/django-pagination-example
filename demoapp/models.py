from django.db import models

# Create your models here.

class City(models.Model):
    city=models.CharField(max_length=64)
    state=models.CharField(max_length=64)
    population=models.IntegerField()
    metropolitan=models.IntegerField()
    sex_ratio=models.IntegerField()
    literacy=models.FloatField()
