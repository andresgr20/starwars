<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StarWarsAPIController extends Controller
{
    private function fetchData(string $resource, Request $request)
    {
        try {
            $page = $request->query('page');
            $search = $request->query('search');
            $searchParam = $search ? "search=" . $search . "&" : "";
            $pageParam = $page ? "page=" . $page : "";
            $url = "https://swapi.dev/api/$resource/?$searchParam" . $pageParam;
            $response = Http::get($url)->json();
            return [
                'result' => $response['results'],
                'previous' => is_string($response['previous']),
                'next' => is_string($response['next']),
            ];
        } catch (\Exception $e) {
            return ['error' => 'An error occurred while fetching the data'];

        }

    }
    public function getPeople(Request $request)
    {
        $data = $this->fetchData('people', $request);
        return response()->json($data);
    }

    public function getStarships(Request $request)
    {
        $data = $this->fetchData('starships', $request);
        return response()->json($data);
    }

    public function getPlanets(Request $request)
    {
        $data = $this->fetchData('planets', $request);
        return response()->json($data);
    }

}