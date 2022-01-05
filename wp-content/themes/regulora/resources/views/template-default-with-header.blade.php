{{--
  Template Name: Default Template With Header
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    @include('partials.page.page-header')
    @include('partials.content-page')
  @endwhile
@endsection
