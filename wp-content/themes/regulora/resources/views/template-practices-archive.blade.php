{{--
  Template Name: Practices List Page
--}}

@extends( 'layouts.app' )

@section('content')

  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page')
  @endwhile

  <div class="practice-archive-page">
    @include('partials.practice.practice-archive')
  </div>

@endsection
