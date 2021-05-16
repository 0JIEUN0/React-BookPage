# WIT React Side-Project: Book Page

<hr>

# 핵심 기능
- 책 API 를 통해 책을 검색하고
- 검색 결과에서 책을 선택하면 '나의 서재'에 등록

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

<hr>

# 추가 기능: 나만의 책장
- 여러 개의 책장을 이름별로 사용하기

## 구현
- 책장 3개를 제공하여 각각 다른 책 정보를 담을 수 있도록 함 (각 책장은 독립적으로 동작) <br>
- 각 책장의 최대 책 개수는 5개로 동일 <br>
- 책장에 넣을 수 있는 공간이 남아있는 경우, 한 개의 빈 공간을 보여줌 (즉, 첫 실행 시 빈 책장 보여줌) <br>
- 기타 구현 사항은 위 내용과 동일 <br>
- 초기 화면: <br>
![image](https://user-images.githubusercontent.com/63097207/118385532-90511480-b64a-11eb-950b-0dc956eeb4cf.png) <br>
![image](https://user-images.githubusercontent.com/63097207/118385539-a1018a80-b64a-11eb-81cc-4ba860dfbb7a.png) <br>
- 예시: <br>
![image](https://user-images.githubusercontent.com/63097207/118385542-a959c580-b64a-11eb-82eb-0d657a77cb0d.png) <br>
![image](https://user-images.githubusercontent.com/63097207/118385553-c098b300-b64a-11eb-87b1-4870e3be4faf.png) <br>
