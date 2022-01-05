@extends( 'layouts.app' )

@section( 'content' )
  @while( have_posts() ) @php the_post() @endphp
    <div class="practice-header page-title-header">
      @include( 'partials.practice.practice-header' )
    </div>
    <div class="row position-relative">
      <div class="col-12 col-lg-8 practice-content">
        @include( 'partials.content-page' )
      </div>
      <div class="col-12 col-lg-4 practice-sidebar sidebar-right">
        @include( 'partials.practice.practice-sidebar' )
      </div>
    </div>
    @if ( $relatedNews = \App\Controllers\Practices::getRelatedNews() )
      @include( 'modules.module-related-news', $relatedNews )
    @endif
    @if ( $testimonial = \App\Controllers\Practices::getRelatedTestimonial() )
      @include( 'modules.module-related-testimonial', $testimonial )
    @endif
  @endwhile
@endsection
