@extends( 'layouts.app' )

@section( 'content' )
  @while( have_posts() ) @php the_post() @endphp
  <div class="attorney-header page-title-header">
    @include( 'partials.attorney.attorney-header' )
  </div>
  <div class="attorney-top-bio">
    @include( 'partials.attorney.attorney-top-bio' )
  </div>
  <div class="row">
    <div class="col-12 col-lg-8 attorney-tabs">
      @include( 'partials.attorney.attorney-tabs' )
    </div>
    <div class="col-12 col-lg-4 attorney-sidebar sidebar-right">
      @include( 'partials.attorney.attorney-sidebar' )
    </div>
  </div>
  @endwhile
@endsection
