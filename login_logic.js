document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const userIdInput = document.getElementById('userId');
    const saveIdCheckbox = document.getElementById('saveId');

    // 1. 페이지 로드 시 저장된 아이디 불러오기
    const savedId = localStorage.getItem('savedUserId');
    if (savedId) {
        userIdInput.value = savedId;
        saveIdCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = userIdInput.value;
        const pw = document.getElementById('userPw').value;

        // 아이디 저장 체크 시 로컬 스토리지에 저장
        if (saveIdCheckbox.checked) {
            localStorage.setItem('savedUserId', id);
        } else {
            localStorage.removeItem('savedUserId');
        }

        // 2. login.ini 확인 로직 (서버 API 호출 가정)
        // 실제로는 fetch('/api/login', { method: 'POST', body: ... }) 형태가 되어야 합니다.
        // 여기서는 파일 형식을 처리하는 가상 로직을 설명합니다.
        
        checkLogin(id, pw);
    });
});

async function checkLogin(inputTd, inputPw) {
    try {
        // 실제 운영 환경에서는 보안상 서버에서 파일을 읽어야 합니다.
        // 아래는 login.ini가 탭으로 구분되어 있다는 가정하의 파싱 예시입니다.
        const response = await fetch('login.ini');
        const data = await response.text();
        
        const users = data.split('\n');
        let isAuthenticated = false;

        for (let line of users) {
            const [fileId, filePw] = line.trim().split('\t'); // 탭으로 분리
            if (fileId === inputTd && filePw === inputPw) {
                isAuthenticated = true;
                break;
            }
        }

        if (isAuthenticated) {
            window.location.href = 'main.html'; // 로그인 성공 시 이동
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('로그인 파일 읽기 실패:', error);
        alert('시스템 오류가 발생했습니다.');
    }
}