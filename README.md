##  Riot API를 활용한 리그 오브 레전드 정보 앱 만들기


LoL은 전 세계적으로 인기 있는 온라인 게임으로, 두 팀의 플레이어들이 서로 경쟁하며 상대팀의 넥서스를 파괴하는 것을 목표로 합니다. 이 게임에서 플레이어들은 '`챔피언(Champion)`'이라는 캐릭터를 조종합니다.

- **챔피언(Champion)**: LoL에서 플레이어가 조종하는 캐릭터입니다. 각 챔피언은 고유한 능력과 플레이 스타일을 가지고 있습니다.

- **챔피언 로테이션(Champion Rotation)**: 매주 무료로 플레이할 수 있는 챔피언들의 목록입니다. 새로운 챔피언을 구매하지 않아도 다양한 챔피언을 경험해볼 수 있습니다.

 챔피언과 아이템 정보 그리고 챔피언 로테이션을 조회해볼 수 있습니다.

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FVxUG7%2FbtsLmV6fqtZ%2F29pTAGLoJPoBfRGeAUZtI1%2Fimg.png)   

## 목차 

1. [PERSONAL](#PERSONAL) 
2. [주요기능](#주요기능-기능) 
3. [개발기간](#개발기간) 
4. [기술스택](#기술스택) 
5. [프로젝트 파일 구조](#프로젝트-파일-구조) 
6. [와이어프레임](#와이어프레임) 
7. [프로젝트 파일 구조](#프로젝트-파일-구조) 
8. [API 명세서](#API-명세서) 
9. [Trouble Shooting](#trouble-shooting) 



## PERSONAL 
|이름|MBTI|
|---|---|
|최한솔|ENTJ|


## 주요 기능
- 챔피언 목록 조회: LoL에 등장하는 모든 챔피언의 정보(이름, 타이틀, 이미지)를 제공합니다.
- 챔피언 상세 정보: 선택한 챔피언의 상세 정보(능력치, 스토리, 이미지)를 제공합니다.
- 챔피언 로테이션: 매주 변경되는 무료 챔피언 로테이션 목록을 확인할 수 있습니다.
- 아이템 목록 조회: 게임 내 등장하는 아이템 목록과 상세 정보를 조회할 수 있습니다.


## 개발기간
2024.12.09(월) ~ 2024.12.19(목)

## 🛠 기술 스택 및 개발 환경

## 기술스택
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


## ✔️ Version Control
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## ✔️ IDE
![VS Code Insiders](https://img.shields.io/badge/VS%20Code%20Insiders-35b393.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
## ✔️ Deploy
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


## 프로젝트 파일 구조
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdfrd4d%2FbtsLlregHHL%2Fyxx3jNIiE0ANvrkJYtFTlk%2Fimg.png)   


## 와이어프레임 

🖥 와이어프레임
메인 페이지: 서비스 소개 및 주요 기능 링크
챔피언 목록 페이지: 모든 챔피언 목록과 간단한 정보 제공
챔피언 상세 페이지: 선택한 챔피언의 상세한 능력치와 스토리 제공
아이템 목록 페이지: 게임 내 아이템 목록 및 주요 정보 제공
챔피언 로테이션 페이지: 매주 갱신되는 무료 챔피언 목록 제공

## API 명세서

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F79Niz%2FbtsLnmWJF8p%2FAj6kSpZzMKelDLkvsqU5W0%2Fimg.png)   


## Trouble Shooting

## Trouble Shooting

1) Hydration Error 발생 </br>

문제 </br>

 클라이언트와 서버의 HTML이 일치하지 않아 Hydration Error가 발생했습니다. </br>
`Warning: Text content does not match server-rendered HTML. 
`
</br>

해결</br>
- 상태 초기화 시 로컬 스토리지를 사용하거나 다크모드 설정 시 SSR과 CSR의 불일치를 방지하기 위해 suppressHydrationWarning**를 <html> 태그에 추가했습니다. </br>
- 클라이언트 컴포넌트에 **'use client'**를 명시했습니다. </br>
`<html lang="en" suppressHydrationWarning>
`

2) Next.js Image 컴포넌트 최적화 경고

문제 </br>
- Image 컴포넌트에서 fill을 사용할 때 부모 요소의 높이가 설정되지 않아 경고가 발생했습니다. </br>


해결 </br>
- 부모 요소에 relative, w-xx, h-xx와 같은 Tailwind CSS 클래스를 추가해 명시적으로 높이를 설정했습니다. </br>
- sizes 속성을 추가해 화면 크기에 맞는 이미지 크기를 제공했습니다. </br>

`<div className="relative w-32 h-32">
   <Image
     src="URL"
     alt="example"
     fill
     sizes="(max-width: 768px) 128px, (max-width: 1200px) 256px, 512px"
     className="object-contain"
   />
</div>
`
