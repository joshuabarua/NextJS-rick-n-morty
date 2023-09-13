// Next
import CharacterCard from '@/components/CharacterCard';
import SearchBar from '@/components/SearchBar';
import {ApiData, Character} from '@/types/Api';
import Head from 'next/head';
// React
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

interface CurrentInfo {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
	current: string;
}

interface Inputs {
	query: string;
}

interface Props {
	response: ApiData;
}

export const API_URL = 'https://rickandmortyapi.com/api/character';

export default function Home(props: Props) {
	const {info, results = []} = props.response;

	console.log(results, info);
	const [characters, setCharacters] = useState<Character[]>(results);
	const [currentInfo, setCurrentInfo] = useState({
		count: 0,
		next: '',
		pages: 0,
		prev: null,
	} as CurrentInfo);
	const [filteredBy, setFilteredBy] = useState<string>('');
	const [searchText, setSearchText] = useState('');
	const [searchFormText, setSearchFormText] = useState('');
	const {current} = currentInfo;
	// const currentPageNumber = current.includes('page=') ? Number(new URL(current).searchParams.get('page')) : 1;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleSubmitForm = (e: FormEvent) => {
		e.preventDefault();
		setSearchFormText(searchText);
	};

	// // Functions
	// const fetchCharacters = async (page: number, search: string) => {
	// 	const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&search=${search}`);
	// 	const data = (await response.json()) as ApiData;
	// 	setCharacters(data.results);
	// 	// setCurrentInfo({data.info, current});
	// };

	// useEffect(() => {
	// 	fetchCharacters(currentPageNumber, searchText).catch((error) => {
	// 		console.log('error :>> ', error);
	// 	});
	// }, [currentPageNumber, searchText]);

	return (
		<>
			<Head>
				<title>Rick and Morty</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={`flex min-h-screen flex-col items-center justify-between p-24 `}>
				<SearchBar handleInputChange={handleInputChange} handleSubmitForm={handleSubmitForm} />
				<div>
					<p>hi</p>
					{characters.map((character) => (
						<CharacterCard key={character.id} character={character} />
					))}
				</div>
				<p>HELLO WORLD</p>
			</main>
		</>
	);
}
export async function getStaticProps() {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();

		return {
			props: {
				response: data, // Use 'response' instead of 'data'
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);

		return {
			props: {
				response: {
					info: {}, // Provide a default empty 'info' object
					results: [], // Provide an empty array for 'results'
				},
			},
		};
	}
}
