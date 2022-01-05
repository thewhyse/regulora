@extends( 'layouts.app' )

@section( 'content' )
  @while( have_posts() ) @php the_post() @endphp
  <div class="news-header page-title-header">
    @include( 'partials.news.news-header' )
  </div>
  <div class="row position-relative">
    <div class="col-12 col-lg-8 news-content">
      @include( 'partials.content-page' )
    </div>
    <div class="col-12 col-lg-4 news-sidebar sidebar-right">
      @include( 'partials.news.news-sidebar' )
    </div>
  </div>
  @endwhile
@endsection
