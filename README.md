# Univment_back
## 동국대학교 멋쟁이사자처럼 2학기 프로젝트 Univment
## 실행

### 라이브러리 설치
    pip install django
    pip install pillow
    pip install dj-rest-auth
    pip install django-allauth
    pip install djangorestframework
    pip install djangorestframework-simplejwt
    pip install django-cors-headers

## API 정리
## 회원가입/로그인/로그아웃
### 회원가입
### 127.0.0.1:8000/auth/registration/ - POST
    {
        "email":"이메일주소",
        "password1":"비밀번호",
        "password2":"비밀번호 확인",
        "name":"이름"
    }
### 로그인
### 127.0.0.1:8000/auth/login/ - POST
    {
        "email":"이메일주소",
        "password":"비밀번호"
    }
### 로그아웃
### 127.0.0.1:8000/auth/logout/ - POST
    {
        "refresh":"refresh_token"
    }
### 비밀번호 바꾸기
### 127.0.0.1:8000/auth/password/change/ - POST
    {
        "new_password1":"새로운 비밀번호",
        "new_password2":"새로운 비밀번호 확인"
    }

## ProfileImage
### 프로필사진 수정하기
### 127.0.0.1:8000/auth/user/ - PUT, PATCH
    {
        "image":"이미지"
    }
### 프로필사진 보기
### 127.0.0.1:8000/auth/user/ - GET
    {
        "pk": user_id,
        "email": "email",
        "image": "이미지"
    }

## NameCard
### 1. NameCardProfile - 명함 기본 정보
### 1-1. 명함 기본 정보 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardprofile/ - POST
    {
        "user" : "해당 유저 id값" - 필수,
        "myname" : "이름" - 필수,
        "email" : "이메일" - 필수,
        "major" : "전공 입력" - 선택,
        "birthday" : 날짜 선택 or YYYY-MM-DD 형식으로 입력(POSTMAN에서 이렇게 해야 함) - 선택
    }
### 보기
### 127.0.0.1:8000/mypage/namecardprofile/ - GET
#### 결과
    {
        "user" : "해당 유저 id값",
        "myname" : "이름",
        "email" : "이메일",
        "birthday" : YYYY-MM-DD 형식,
        "major" : "전공"
    }

### 1-2. 명함 기본 정보 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardprofile/<int:user_id>/ - GET
#### 결과
    {
        "user" : "해당 유저 id값",
        "myname" : "이름",
        "email" : "이메일",
        "birthday" : YYYY-MM-DD 형식,
        "major" : "전공"
    }
    
### 수정하기
### 127.0.0.1:8000/mypage/namecardprofile/<int:user_id>/ - PUT, PATCH
    {
        "user" : "해당 유저 id값" - 필수,
        "myname" : "이름" - 필수,
        "email" : "이메일" - 필수,
        "major" : "전공 입력" - 선택,
        "birthday" : 날짜 선택 or YYYY-MM-DD 형식으로 입력(POSTMAN에서 이렇게 해야 함) - 선택
    }
### 삭제
### 127.0.0.1:8000/mypage/namecardprofile/<int:user_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸

### 2. NameCardContacts - 명함 contact 관련
### 2-1. 명함 contact 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardcontacts/ - POST
    {
        "user" : "해당 유저 id값" - 필수,
        "phonenumber" : xxx-xxxx-xxxx 형식으로 입력('-' 포함 최대 13글자로 설정) - 필수,
        "insta" : "인스타 아이디 @xxxxx 입력" - 선택,
        "github" : "깃허브 주소 입력" - 선택,
        "blog" : "블로그 주소 입력" - 선택
    }
### 보기
### 127.0.0.1:8000/mypage/namecardcontacts/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "phonenumber": "xxx-xxxx-xxxx",
        "insta": "",
        "github": "",
        "blog": ""
    }
    
### 2-2. 명함 contacts 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardcontacts/<int:user_id>/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "phonenumber": "xxx-xxxx-xxxx",
        "insta": "",
        "github": "",
        "blog": ""
    }
### 수정하기
### 127.0.0.1:8000/mypage/namecardcontacts/<int:user_id>/ - PUT, PATCH
    {
        "user" : "해당 유저 id값" - 필수,
        "phonenumber" : xxx-xxxx-xxxx 형식으로 입력('-' 포함 최대 13글자로 설정) - 필수,
        "insta" : "인스타 아이디 @xxxxx 입력" - 선택,
        "github" : "깃허브 주소 입력" - 선택,
        "blog" : "블로그 주소 입력" - 선택
    }
### 삭제하기
### 127.0.0.1:8000/mypage/namecardcontacts/<int:user_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸

### 3. NameCardClubs - 명함 club 관련
### 3-1. 명함 club 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardclubs/ - POST
    {
        "user": "해당 유저 id값" - 필수,
        "club1": "동아리명" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "club2": "",
        "club3": "",
        "club4": "",
        "club5": ""
    }
### 보기
### 127.0.0.1:8000/mypage/namecardclubs/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "club1": "동아리명",
        "club2": "",
        "club3": "",
        "club4": "",
        "club5": ""
    }
    
### 3-2. 명함 club 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardclubs/<int:user_id>/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "club1": "동아리명",
        "club2": "",
        "club3": "",
        "club4": "",
        "club5": ""
    }
### 수정하기
### 127.0.0.1:8000/mypage/namecardclubs/<int:user_id>/ - PUT
    {
        "user": "해당 유저 id값" - 필수,
        "club1": "동아리명" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "club2": "",
        "club3": "",
        "club4": "",
        "club5": ""
    }
### 삭제하기
### 127.0.0.1:8000/mypage/namecardclubs/<int:user_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸

### 4. NameCardContests - 명함 contest 관련
### 4-1. 명함 contest 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardcontests/ - POST
    {
        "user": "해당 유저 id값" - 필수,
        "contest1": "대회명 + 수상실적(맘대로)" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "contest2": "",
        "contest3": "",
        "contest4": "",
        "contest5": ""
    }
### 보기
### 127.0.0.1:8000/mypage/namecardcontests/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "contest1": "대회명",
        "contest2": "",
        "contest3": "",
        "contest4": "",
        "contest5": ""
    }
    
### 4-2. 명함 contest 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardcontests/<int:user_id>/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "contest1": "대회명",
        "contest2": "",
        "contest3": "",
        "contest4": "",
        "contest5": ""
    }
### 수정하기
### 127.0.0.1:8000/mypage/namecardcontests/<int:user_id>/ - PUT
    {
        "user": "해당 유저 id값" - 필수,
        "contest1": "대회명 + 수상실적(맘대로)" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "contest2": "",
        "contest3": "",
        "contest4": "",
        "contest5": ""
    }
### 삭제하기
### 127.0.0.1:8000/mypage/namecardcontests/<int:user_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸

### 5. NameCardProjects - 명함 project 관련
### 5-1. 명함 project 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardprojects/ - POST
    {
        "user": "해당 유저 id값" - 필수,
        "project1": "프로젝트명" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "project2": "",
        "project3": "",
        "project4": "",
        "project5": ""
    }
### 보기
### 127.0.0.1:8000/mypage/namecardprojects/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "project1": "프로젝트명",
        "project2": "",
        "project3": "",
        "project4": "",
        "project5": ""
    }
    
### 5-2. 명함 project 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardprojects/<int:user_id>/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "project1": "프로젝트명",
        "project2": "",
        "project3": "",
        "project4": "",
        "project5": ""
    }
### 수정하기
### 127.0.0.1:8000/mypage/namecardprojects/<int:user_id>/ - PUT
    {
        "user": "해당 유저 id값" - 필수,
        "project1": "대회명 + 수상실적(맘대로)" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "project2": "",
        "project3": "",
        "project4": "",
        "project5": ""
    }
### 삭제하기
### 127.0.0.1:8000/mypage/namecardprojects/<int:user_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸

### 6. NameCardActivities - 명함 activity 관련
### 6-1. 명함 activity 입력, 보기
### 입력
### 127.0.0.1:8000/mypage/namecardactivities/ - POST
    {
        "user": "해당 유저 id값" - 필수,
        "activity1": "대외활동명" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "activity2": "",
        "activity3": "",
        "activity4": "",
        "activity5": ""
    }
### 보기
### 127.0.0.1:8000/mypage/namecardactivities/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "activity1": "대외활동명",
        "activity2": "",
        "activity3": "",
        "activity4": "",
        "activity5": ""
    }
    
### 6-2. 명함 activity 보기, 수정, 삭제하기
### 보기
### 127.0.0.1:8000/mypage/namecardactivities/<int:user_id>/ - GET
#### 결과
    {
        "user": "해당 유저 id값",
        "activity1": "대외활동명",
        "activity2": "",
        "activity3": "",
        "activity4": "",
        "activity5": ""
    }
### 수정하기
### 127.0.0.1:8000/mypage/namecardactivities/<int:user_id>/ - PUT
    {
        "user": "해당 유저 id값" - 필수,
        "activity1": "대외활동명" - 일단은 5개 모두 필수값으로 두진 않음(일단은 모두 선택으로 둠),
        "activity2": "",
        "activity3": "",
        "activity4": "",
        "activity5": ""
    }
### 삭제하기
### 127.0.0.1:8000/mypage/namecardactivities/<int:uesr_id>/ - DELETE
그냥 사라지고 아무것도 안 뜸


## POST
### 127.0.0.1:8000/post/ - POST (새 글 등록)
#### (포스트맨에서 테스트 할때 form-data로 해야 정상 작동 되었음)
    {
        "user": 2, # 필수
        "title": "title", # 선택 (기본값 = 빈칸), 최대 100글자
        "answer1":"ex1",
        "answer2":"ex2",
        "answer3":"ex3",
        "answer4":"ex4",
        "image"(FILE): "http://127.0.0.1:8000/media/pikachu.png", # 선택
        "event_date": "2022-10-04", # 선택 (기본값 = 오늘 날짜)
        "category": 3, # 필수
        "timeline": false # 필수
    }
### 127.0.0.1:8000/post/<int:id>/ - GET (해당 글 세부 사항)
### 127.0.0.1:8000/post/<int:id>/ - PATCH (해당 글 수정, 매개변수는 POST와 동일)
### 127.0.0.1:8000/post/<int:id>/ - DELETE (해당 글 삭제)
### 127.0.0.1:8000/post/postwithlogin/ - POST (로그인 후 글 등록) 
#### (포스트맨에서 테스트 할때 form-data로 해야 정상 작동 되었음)
    {
        "title": "title", # 선택 (기본값 = 빈칸), 최대 100글자
        "answer1":"ex1",
        "answer2":"ex2",
        "answer3":"ex3",
        "answer4":"ex4",
        "image"(FILE): "http://127.0.0.1:8000/media/pikachu.png", # 선택
        "event_date": "2022-10-04", # 선택 (기본값 = 오늘 날짜)
        "category": "category1", # 필수
        "timeline": true, # 필수
        "email": "minyoung_stat@dgu.ac.kr", # 필수
        "password": "example123", #필수
    }
### 127.0.0.1:8000/post/category/ - POST (새 카테고리 등록)
    {
        "name":"category2", # 필수, 최대 100글자
        "isDefault":false,
        "color":"#223344 # 선택, 최대 20글자
        "generated_user":1, # 필수
        "questions":["question1", "question2", "question3"] # 선택
    }
### 127.0.0.1:8000/post/category/ - GET (기본 카테고리 + 유저 생성 카테고리 목록)
#### onlyusercontent가 true이면 유저 생성 카테고리만 받아옵니다.
    {
        onlyusercontent : true # 선택, (기본값 = false)
    }
### 127.0.0.1:8000/post/category/<int:category>/ - GET (해당 카테고리에 현재 유저가 등록한 글 목록)
### 127.0.0.1:8000/post/category/<int:category>/ - DELETE (해당 카테고리 삭제)
### 127.0.0.1:8000/post/category/<int:category>/ - PUT, PATCH (해당 카테고리 수정)
#### 부분만 수정하는 법을 못찾아서 일단 전체 매개변수를 써야할 것 같습니다..
    {
        "name":"category2_update",
        "isDefault":false,
        "generated_user":1,
        "questions":["question1", "question2", "question3"]
    }

