<footer class="page-footer content-info">
  <div class="container-fluid container-xl">
    <div class="row">
      <div class="col-12">
        <a class="footer-logo" href="{{ home_url('/') }}">
          {!! \App\Controllers\App::siteLogo( 'footer' ) !!}
        </a>
      </div>
      <div class="col-12">
        @php dynamic_sidebar('sidebar-footer') @endphp
      </div>
      <div class="copyright col-12 align-self-end">
        {!! App::siteFooterCopyright() !!}
      </div>
    </div>
  </div>
</footer>
