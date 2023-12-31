<footer class="page-footer content-info">
  <div class="container">
    {{--<div class="alignwide">--}}
    <div class="footer-holder">
      {{--<div class="row mx-0 align-items-center">--}}
      <div class="row mx-0 align-items-end">
        <div class="col-12 col-lg-1 p-0 text-center">
          <a class="footer-logo" href="{{ home_url('/') }}" aria-label="Footer Logo">
            {{--{!! \App\Controllers\App::siteLogo( 'footer' ) !!}--}}
            <img src="/wp-content/uploads/2022/11/footer_Logo.svg" alt="Regulora">
          </a>
        </div>
        <div class="col-12 col-lg-11 ps-lg-5">
          <div class="row mx-0 h-100 sub-footer-links">
            {{--<div class="col-12 mb-lg-2 align-self-end">--}}
            <div class="col-12 align-self-end">
              @if (has_nav_menu('footer_navigation'))
                {!! wp_nav_menu( [ 'theme_location' => 'footer_navigation', 'menu_class' => 'nav-footer' ] ) !!}
              @endif
                <div class="footer-social-links">
                  @php dynamic_sidebar('sidebar-footer-under-menu') @endphp
                </div>
            </div>
            {{--<div class="col-12 align-self-end under-menu">
              @php dynamic_sidebar('sidebar-footer-under-menu') @endphp
            </div>--}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-primary footer-widets">
    <div class="container">
      <div class="alignwide">
        <div class="row align-items-end gap-3 gap-lg-0">
          <div class="col-12 col-lg-3">
            @php dynamic_sidebar('sidebar-footer-left') @endphp
          </div>
          <div class="col-12 col-lg-6">
            @php dynamic_sidebar('sidebar-footer-center') @endphp
          </div>
          <div class="col-12 col-lg-3">
            @php dynamic_sidebar('sidebar-footer-right') @endphp
            <div class="copyright">
              {!! App::siteFooterCopyright() !!}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="back-to-top">
    <span>Back to top</span><div class="icon"><?=\App\Controllers\App::svg( 'back-to-top' )?></div>
  </div>
</footer>

{{--
<div id="choice-popup" class="">
  <div class="inner">
    <h2>ARE YOU A US HEALTHCARE PROFESSIONAL?</h2>
    <p>The information provided in this website is<br/>intended for US healthcare professionals only</p>
    <div class="buttons">
      <a id="prof" class="make-choice">
        I am a US<br/>healthcare professional
      </a>
      <a href="https://regulora.com" id="patient" class="make-choice">
        Go to the<br/>patient website
      </a>
    </div>
  </div>
</div>
--}}

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VVEVEH16NV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VRN1PJ9VDW');
</script>


<!-- Hotjar Tracking Code for regulora.com --><script>    (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3288655,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>

