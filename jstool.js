var jstool = (function() {
    /**
     * 숫자 천단위 콤마처리 함수
     * @param {number} number 콤마 추가할 숫자
     * @returns {string} 콤마 추가된 숫자
     */
    function numberWithCommas(number) {
        var parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
    }

    /**
     * 콤마처리된 숫자 콤마제거 함수
     * @param {string} number 콤마 제거할 숫자
     * @returns {number} 콤마 제거된 숫자
     */
    function numberWithoutCommas(number) {
        return Number(number.replace(/,/g, ''));
    }

    /**
     * 자리수만큼 문자로 채우기
     * @param {string} chr 채울 문자
     * @param {number} width 길이
     * @param {string} string 문자
     * @returns {string} 변환된 문자
     */
    function fillString(chr, width, string) {
        if (string == undefined || string == null) {
            return null;
        }
        return string.length >= width ? string : new Array(width - string.length + 1).join(chr) + string;
    }

    /**
     * 자리수만큼 0 채우기
     * @param {number} width 길이
     * @param {number} number 숫자
     * @returns {string} 변환된 숫자
     */
    function fillZero(width, number) {
        return fillString('0', width, number.toString());
    }

    /**
     * 문자열 모두 변경
     * @param {string} search 변경될 문자
     * @param {string} replace 변경할 문자
     * @param {*} string 변경시킬 문자열
     * @returns 변경된 문자열
     */
    function replaceAll(search, replace, string) {
        return string.split(search).join(replace);
    }

    /**
     * 양쪽끝 공백제거
     * @param {*} string 제거할 문자열
     * @returns 제거된 문자열
     */
    function trim(string) {
        return string.replace(/^\s+|\s+$/gm, '');
    }

    /**
     * 빈값 체크함수
     * @param {*} value 체크할 값
     * @returns {boolean} 결과
     */
    function isEmpty(value) {
        if (
            value == ''
            || value == null 
            || value == undefined 
            || (
                value != null 
                && typeof value == 'object' 
                && !Object.keys(value).length
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 값이 숫자인지 체크
     * @param {*} value 체크할 값
     * @returns {boolean} 결과
     */
    function isNumber(value) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    }

    /**
     * 값이 이메일형식인지 확인
     * @param {string} email 체크할 문자열
     * @returns {boolean} 이메일형식 여부
     */
    function isEmail(email) {
        return /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/.test(email);
    }

    /**
     * 브라우저가 InternetExplorer인지 확인
     * @returns {*} InternetExplorer 버전
     */
     function isIE() {
        var agent = navigator.userAgent.toLowerCase();
        if (
            (
                navigator.appName == 'Netscape'
                && agent.indexOf('trident') != -1
            )
            || (agent.indexOf('msie') != -1)
            || (agent.indexOf('edg/') != -1)
            || (agent.indexOf('edge/') != -1)
        ) {
            var version = true;
            var word = '';
            if (navigator.appName == "Microsoft Internet Explorer") {
                word = "msie ";
            } else if (agent.search("trident") != -1) {
                word = "trident/.*rv:"; 
            } else if (
                agent.search("edg/") != -1
                || agent.search("edge/") != -1
            ) {
                return 'edge';
            }
            var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
            if (reg.exec( agent ) != null) {
                version = RegExp.$1 + RegExp.$2;
            }
            return version;
        } else {
            return false;
        }
    }

    /**
     * 랜덤한 문자열 생성
     * @param {*} length 생성할 문자열의 길이
     * @param {*} characters 생성문자열 지정 (미입력시 대소문자+숫자)
     * @returns 랜덤문자열
     */
    function makeRamdomString(length, characters) {
        characters = isEmpty(characters) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : characters;
        var result = '';
        for (var i=0; i < length; i++) {
            var c = Math.floor(Math.random() * characters.length);
            result += characters.substring(c, c + 1);
        }
        return result;
    }

    /**
     * 쿠키 저장
     * @param {string} name 쿠키명
     * @param {string} value 저장할 값
     * @param {number} exp 유효시간 (초)
     */
    function setCookie(name, value, exp) {
        var expire = new Date();
        expire.setTime(expire.getTime() + exp * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + expire.toUTCString() + ';path=/';
    }

    /**
     * 쿠키값 불러오기
     * @param {string} name 쿠키명
     * @returns {string} 쿠키값
     */
    function getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value ? value[2] : null;
    }

    /**
     * 쿠키값 삭제
     * @param {string} name 쿠키명
     */
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }

    /**
     * 줄바꿈 변경 처리
     * @param {string} html 
     * @returns 
     */
    function nl2br(html) {
        return html.replace(/\n/g, '<br />');
    }

    /**
     * OS 정보 확인
     * @returns {string} pc/android/ios/other
     */
    function os() {
        var userAgent = navigator.userAgent.toLowerCase();
        var mobile = (/phone|ipad|ipod|android/i.test(userAgent));

        if (mobile) {
            if (userAgent.search('android') !== -1) {
                return 'android';
            }

            if (
                userAgent.search('iphone') !== -1
                || userAgent.search('ipod') !== -1
                || userAgent.search('ipad') !== -1
            ) {
                return 'ios';
            }

            return 'other';
        }

        return 'pc';
    }

    /**
     * 앱 실행 함수
     * @param {string} aos_scheme 안드로이드앱 scheme
     * @param {string} aos_host 안드로이드앱 host
     * @param {string} aos_package 안드로이드앱 패키지명
     * @param {string} ios_url IOS앱 스키마URL
     * @param {string} ios_appstore_url IOS앱 앱스토어 URL
     * @param {function} pc_cbfc PC인 경우 콜백함수
     */
    function appRun(aos_scheme, aos_host, aos_package, ios_url, ios_appstore_url, pc_cbfc) {
        pc_cbfc = isEmpty(pc_cbfc) ? function() {} : pc_cbfc;
        var os = os();

        if (os == 'pc') {
            if (typeof pc_cbfc == 'function') {
                pc_cbfc();
            }
        } else {
            var cTime = (new Date()).getTime();
            if (os == 'ios') {
                setTimeout(function () {
                    window.location = ios_appstore_url;
                }, 1000);
                window.location = ios_url;
            } else {
                var userAgent = navigator.userAgent;
                if (userAgent.match(/Chrome/)) {
                    location.href = 'intent://' + aos_host + '#Intent;scheme=' + aos_scheme + ';package=' + aos_package + ';end';
                } else {
                    setTimeout(function () {
                        if ((new Date()).getTime() - cTime < 2000) {
                            location.href = 'https://play.google.com/store/apps/details?id=' + aos_package;
                        }
                    }, 500);
                    var iframe = document.createElement('iframe');
                    iframe.style.visibility = 'hidden';
                    iframe.src = aos_scheme + '://' + aos_host;
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe);
                }
            }
        }
    }

    function clipboard(string) {
        if (isIE()) {
            if (window.clipboardData) {
                window.clipboardData.setData("Text", string);
            } else {
                console.log(2);
            }
        } else {
            var t = document.createElement('textarea');
            document.body.appendChild(t);
            t.value = string;
            t.select();
            document.execCommand('Copy');
            document.body.removeChild(t);
        }
    }

    return {
        numberWithCommas: numberWithCommas,
        numberWithoutCommas: numberWithoutCommas,
        fillString: fillString,
        fillZero: fillZero,
        replaceAll: replaceAll,
        trim: trim,
        isEmpty: isEmpty,
        isNumber: isNumber,
        isEmail: isEmail,
        isIE: isIE,
        makeRamdomString: makeRamdomString,
        setCookie: setCookie,
        getCookie: getCookie,
        deleteCookie: deleteCookie,
        nl2br: nl2br,
        os: os,
        appRun: appRun,
        clipboard: clipboard,
    }
})();