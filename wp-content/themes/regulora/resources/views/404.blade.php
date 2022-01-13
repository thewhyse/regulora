@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  @if ( ! have_posts() )
    @if ( $notFoundPage = \App\Controllers\App::themeOptions( '404page' ) )
      {!! apply_filters( 'the_content', $notFoundPage->post_content ) !!}
    @else
      <h2 class="alert alert-warning mb-5">
          NO RESULTS FOUND
      </h2>
      <div>The page you requested could not be found. Try refining your search.</div>
    @endif
  @endif
@endsection
