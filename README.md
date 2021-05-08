# WIT React Side-Project: Book Page

## 핵심 기능
- 책 API 를 통해 책을 검색하고
- 검색 결과에서 책을 선택하면 '나의 서재'에 등록

<hr>

## 구현
- Naver 책 검색 API 를 사용해서 책 검색 후 출력 (유사도 기준, 상위 5개) 구현 <br>
- 초기 화면:  <br>
![image](https://user-images.githubusercontent.com/63097207/117545692-cf3b0500-b061-11eb-9948-5888a539dbcb.png) <br>
- 검색 예시:  <br>
![image](https://user-images.githubusercontent.com/63097207/117545699-d19d5f00-b061-11eb-9616-eee2c14991ed.png) <br>
- 검색 결과에서 책 이미지 선택 시, 위에 이미지 등록 (최대 5개, 6번째부터는 등록하지 않음)<br>
![image](https://user-images.githubusercontent.com/63097207/117547741-39f13e00-b06c-11eb-9b0d-e0078b5c1ad4.png) <br>
![image](https://user-images.githubusercontent.com/63097207/117547769-6907af80-b06c-11eb-9e4a-8e123f8ae70a.png) <br>

## 입력에 따른 동작
- 적법한 인자: 검색 결과가 하나라도 있는 query <br>
- 적법하지 않은 인자: 검색어 없음(빈 query) / 검색 결과가 하나도 없음 / API 에러 <br>
- 예시1) 검색어 없음(빈 query) <br>
![image](https://user-images.githubusercontent.com/63097207/117547783-7f157000-b06c-11eb-902c-2751f3d450a3.png) <br>
- 예시2) 검색 결과가 하나도 없음 <br>
![image](https://user-images.githubusercontent.com/63097207/117547780-77ee6200-b06c-11eb-9123-cf99afa5bfd1.png) <br>
