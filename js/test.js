const smartjeweler_user_id = document.currentScript.getAttribute('user_id');

const checkBannerState = async () => {
  const data = await fetch(`https://api.smartjeweler.com/api/v1/check-banner-state?api-key=${smartjeweler_user_id}`)
  const json = await data.json()
  return json.on
}

window.addEventListener("load", async function (event) {
  /*QUIZ STYLE*/
  const style = document.createElement('style');
  style.type = 'text/css';
  const keyFrames = `
  .smartjeweler_hidden{
    display: block !important;
  }
  .smartjeweler_size_wrapper-${smartjeweler_user_id}{
    border-radius: 12px;
    overflow:hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    max-width: 150px;
    min-width: 90vw;
    min-height: 80%;
    max-height: 90%;
    
    border: 10px solid green;
  }

  @media screen and (max-width: 1200px){
    .smartjeweler_size_wrapper-${smartjeweler_user_id}{
      max-width: 90px !important;
      min-width: 90px !important;
      width: 90px !important;
    }

  }

  #smartjeweler_iframe_close_button-${smartjeweler_user_id}{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding:10px;
    cursor: pointer;
  }
  #smartjeweler_iframe_close_button-${smartjeweler_user_id}::after{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 3px;
    height: 25px;
    background-color: #0c0c0c;
    border-radius: 15px;
  }
  #smartjeweler_iframe_close_button-${smartjeweler_user_id}::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 3px;
    height: 25px;
    background-color: #0c0c0c;
    border-radius: 15px;
  }
  .smartjeweler_banner-${smartjeweler_user_id}{
    border-radius: 12px;
    border: 1.5px solid #2AA09D;
    background:  #FFF;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    padding: 10px;

    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
  }
  .smartjeweler_banner-${smartjeweler_user_id} h3{
    color: #2C2E30;
    text-align: center;
    font-family: Quicksand, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;

    text-transform: uppercase;
  }
  .smartjeweler_banner-${smartjeweler_user_id} span{
    color: var(--Text-text-primary, #2C2E30);
    text-align: center;

    /* Body/Body 1 */
    font-family: Quicksand, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 450;

    letter-spacing: -0.176px;
  }

  `
  style.innerHTML = keyFrames;

  const link = document.createElement('link');
  link.rel = 'stylesheet'
  link.href = 'https://smartjeweler.com/smartjeweler_integration_assets/smart_jeweler_style.css'

  document.getElementsByTagName('head')[0].appendChild(style);
  document.getElementsByTagName('head')[0].appendChild(link);
  /*QUIZ STYLE*/

  /*IFRAME LOGIC */
  const iframe = document.getElementById(`smartjeweler_iframe_wrapper-${smartjeweler_user_id}`)
  const button = document.getElementById(`smartjeweler_button-${smartjeweler_user_id}`)
  const close_button = document.getElementById(`smartjeweler_iframe_close_button-${smartjeweler_user_id}`)

  const iframeVisibilityToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const toggleState = iframe.classList.toggle('smartjeweler_hidden')

    // iframe.classList.toggle('smartjeweler_hidden')
    if(toggleState){
      adBannerHide(e)
    } else {
      adBannerShow(e)
    }
  }

  if (button) {
    button.addEventListener('click', iframeVisibilityToggle)
    button.addEventListener("touchend", iframeVisibilityToggle)
  }

  close_button.addEventListener('click', iframeVisibilityToggle)
  close_button.addEventListener("touchend", iframeVisibilityToggle)
  const bannerState = await checkBannerState()

  /*IFRAME LOGIC */

  /*AD BANNER LOGIC */
  if (bannerState) {

    const adBanner = document.createElement('div')
    adBanner.classList.add(`smartjeweler__banner`)
    adBanner.innerHTML = `
    <div class="smartjeweler__banner__close">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.244078 0.244078C0.569515 -0.0813592 1.09715 -0.0813592 1.42259 0.244078L5 3.82149L8.57741 0.244078C8.90285 -0.0813592 9.43049 -0.0813592 9.75592 0.244078C10.0814 0.569515 10.0814 1.09715 9.75592 1.42259L6.17851 5L9.75592 8.57741C10.0814 8.90285 10.0814 9.43049 9.75592 9.75592C9.43049 10.0814 8.90285 10.0814 8.57741 9.75592L5 6.17851L1.42259 9.75592C1.09715 10.0814 0.569515 10.0814 0.244078 9.75592C-0.0813592 9.43049 -0.0813592 8.90285 0.244078 8.57741L3.82149 5L0.244078 1.42259C-0.0813592 1.09715 -0.0813592 0.569515 0.244078 0.244078Z"
            fill="#2F2563"
          />
        </svg>
      </div>
      <span class="smartjeweler__banner__title">Generate Your Dream Jewelry with AI</span>
      <div class="smartjeweler__banner__grid-section">
        <div class="smartjeweler__banner__grid-item smartjeweler__banner__grid-item1">
          <img src="https://smartjeweler.com/smartjeweler_integration_assets/jewerly1.png" alt="" />
        </div>
        <div class="smartjeweler__banner__grid-item smartjeweler__banner__grid-item2 smartjeweler__banner__flex">
          <span>Creating Your </span>
          <span class="smartjeweler__banner__title-design">Own Design</span>
          <img src="https://smartjeweler.com/smartjeweler_integration_assets/jewerly2.png" alt="" />
        </div>
        <div class="smartjeweler__banner__grid-item smartjeweler__banner__grid-item3 smartjeweler__banner__flex">
          <img src="https://smartjeweler.com/smartjeweler_integration_assets/jewerly3.png" alt="" />
          <span>Gain</span>
          <span class="smartjeweler__banner__title-design">50+</span>
          <span>Clients</span>
        </div>
        <div class="smartjeweler__banner__button-block">
          <button class="smartjeweler__smart__button">Start Now!</button>

          <button class="smartjeweler__arrow__button">
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.92188 1.9375L11.9844 7L6.92187 12.0625M11.2812 7L1.01562 7"
                stroke="#2F2563"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="linear-grad-svg"
            >
              <path
                d="M6.92188 1.9375L11.9844 7L6.92187 12.0625M11.2812 7L1.01562 7"
                stroke="url(#paint0_linear_4494_738)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4494_738"
                  x1="6.42687"
                  y1="2.39412"
                  x2="6.38374"
                  y2="11.6283"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4889FA" />
                  <stop offset="0.479167" stop-color="#6B5EF9" />
                  <stop offset="1" stop-color="#F95BF9" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    `

    document.querySelector('body').appendChild(adBanner);

    const activeBanner = document.querySelector(`.smartjeweler__banner`)
    const closeBannerButton = document.querySelector(`.smartjeweler__banner__close`)

    function adBannerHide (e) {
      e.preventDefault()
      e.stopPropagation()
      activeBanner.classList.add('smartjeweler__banner-transition')
      activeBanner.classList.add('smartjeweler__banner-hide')

      activeBanner.removeEventListener('click', iframeVisibilityToggle)
      activeBanner.removeEventListener("touchend", iframeVisibilityToggle)

      activeBanner.addEventListener('click', adBannerShow)
      activeBanner.addEventListener("touchend", adBannerShow)

    }
    function adBannerShow (e) {
      e.preventDefault()
      e.stopPropagation()
      activeBanner.classList.remove('smartjeweler__banner-hide')

      activeBanner.addEventListener('click', iframeVisibilityToggle)
      activeBanner.addEventListener("touchend", iframeVisibilityToggle)

      activeBanner.removeEventListener('click', adBannerShow)
      activeBanner.removeEventListener("touchend", adBannerShow)
    }

    activeBanner.addEventListener('click', iframeVisibilityToggle)
    activeBanner.addEventListener("touchend", iframeVisibilityToggle)

    closeBannerButton.addEventListener('click', adBannerHide)
    closeBannerButton.addEventListener("touchend", adBannerHide)

  }
  /*AD BANNER LOGIC */


  iframe.addEventListener('click', iframeVisibilityToggle)
  iframe.addEventListener("touchend", iframeVisibilityToggle)


});






{/* <iframe src="https://smartjeweler.com/q/init/UnuLxVJtOUd8pHwosqNuFzvLwMf7plS3" width="100vw" height="100vh" style="border: 0; position:fixed; top:0; left:0"></iframe> */ }
