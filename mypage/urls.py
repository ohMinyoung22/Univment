from django.urls import path
from .views import *

app_name = "mypage"
urlpatterns = [
    #명함 프로필 내용 작성
    path('namecardprofile/', NameCardProfile.as_view()),
    #명함 프로필 보기, 수정, 삭제
    path('namecardprofile/<int:user_id>/', NameCardProfileDetail.as_view()),
    #명함 contacts 내용 작성
    path('namecardcontacts/', NameCardContacts.as_view()),
    #명함 contacts 내용 보기, 수정, 삭제
    path('namecardcontacts/<int:user_id>/', NameCardContactsDetail.as_view()),
    #명함 clubs 내용 작성
    path('namecardclubs/', NameCardClubs.as_view()),
    #명함 clubs 내용 보기, 수정, 삭제
    path('namecardclubs/<int:user_id>/', NameCardClubsDetail.as_view()),
    #명함 contests 내용 작성
    path('namecardcontests/', NameCardContests.as_view()),
    #명함 contests 내용 보기, 수정, 삭제
    path('namecardcontests/<int:user_id>/', NameCardContestsDetail.as_view()),
    #명함 projects 내용 작성
    path('namecardprojects/', NameCardProjects.as_view()),
    #명함 projects 내용 보기, 수정, 삭제
    path('namecardprojects/<int:user_id>/', NameCardProjectsDetail.as_view()),
    #명함 activities 내용 작성
    path('namecardactivities/', NameCardActivities.as_view()),
    #명함 activities 내용 보기, 수정, 삭제
    path('namecardactivities/<int:user_id>/', NameCardActivitiesDetail.as_view()),

    # 명함 내용 전체 모아 보기
    # path('namecard/', NameCard.as_view()),
]