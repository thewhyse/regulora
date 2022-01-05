{{--
  Template Name: Attorney List Page
--}}

@extends( ( isset ( $_GET['ajax'] ) ? 'layouts.ajax' : 'layouts.app' ) )

@section('content')
  @if ( ! isset ( $_GET['ajax'] ) )
    @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page')
    @endwhile
  @endif

  <div class="attorney-archive-page">
    @include('partials.attorney.attorney-archive')
  </div>

@endsection
