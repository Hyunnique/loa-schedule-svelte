<script lang="ts">

    // 먼저, 로그인 데이터가 존재하지 않는다면 로그인
    // 서비스 목적에 맞게끔 불편함을 최소화하기 위해서 로그인 Cookie가 expire 되지 않게끔
    // 접속시 주기적으로 세션 갱신, 데이터 받아오기

    // 만약 로그인 이후 저장된 데이터가 없다면
    // QuickStart Modal 호출

    // 1. 본인 계정 및 캐릭터 인증
    // - How? 계정 생성시 LOSTARK API KEY 함께 입력 및 Connection Test

    // 2. 표시할 캐릭터를 선택해주세요. 나중에 수정할 수 있습니다.
    // - 계정의 모든 캐릭터를 불러와 요약 정보 표시, 기존의 선택 UI 유사하게 채용

    // 3. 추가로 표시할 캐릭터가 있다면 입력해주세요.
    // - 부계정이 존재할 시에 사용, API key를 통해 인증된 캐릭터들은 아니기 때문에 검색을 통해 redirect 되진 않지만,
    // - 본계정의 캐릭터 아이디로 검색할 경우에는 동일하게 표시되어 볼 수 있음

    // 4. 미리 사용할 숙제 템플릿을 선택해주세요.
    // - 자유 선택 가능 (일일 숙제, 주간 군단장/어비스 숙제, 주간 길드 숙제, 주간 에포나 숙제 등)

    // 5. 숙제 공개 여부를 선택해주세요.
    // - 전체 공개 (메모, 중요 표시 여부 포함), 일부 공개 (메모, 중요 표시 여부 제외), 비공개 (검색 노출 불가)

</script>

<div>

</div>

<style>

</style>