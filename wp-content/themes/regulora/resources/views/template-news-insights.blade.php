{{--
  Template Name: News & Insights List Page
--}}

@extends( 'layouts.app' )

@section('content')

  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page')
  @endwhile

  <div class="news-archive-page">
    @include('partials.news.news-archive')
  </div>

@endsection
