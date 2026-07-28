import { useState, useEffect, useMemo } from 'react';
import { fetchPokemonList, fetchPokemonsByType } from '../services/pokeApi';
import { REGION_RANGES, LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from '../utils/filterConstants';

export function usePokemonFilter() {
  const [allPokemons, setAllPokemons] = useState<{name: string, id: number}[]>([]);
  
  const [inputText, setInputText] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const [selectedType1, setSelectedType1] = useState<string | null>(null);
  const [selectedType2, setSelectedType2] = useState<string | null>(null);
  const [type1FilteredNames, setType1FilteredNames] = useState<string[]>([]);
  const [type2FilteredNames, setType2FilteredNames] = useState<string[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemonList().then(results => {
      const mapped = results.map((p: any) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
        return { name: p.name, id };
      });
      setAllPokemons(mapped);
    });
  }, []);

  useEffect(() => {
    if (!selectedType1) {
      setType1FilteredNames([]);
      return;
    }
    fetchPokemonsByType(selectedType1).then(names => setType1FilteredNames(names));
  }, [selectedType1]);

  useEffect(() => {
    if (!selectedType2) {
      setType2FilteredNames([]);
      return;
    }
    fetchPokemonsByType(selectedType2).then(names => setType2FilteredNames(names));
  }, [selectedType2]);

  const baseFilteredPokemons = useMemo(() => {
    return allPokemons.filter(pokemon => {
      if (selectedType1 && !type1FilteredNames.includes(pokemon.name)) return false;
      if (selectedType2 && !type2FilteredNames.includes(pokemon.name)) return false;

      if (selectedRegion) {
         const range = REGION_RANGES[selectedRegion as keyof typeof REGION_RANGES];
         const baseId = pokemon.id > 10000 ? pokemon.id % 10000 : pokemon.id;
         if (baseId < range[0] || baseId > range[1]) return false;
      }

      if (selectedRarity === 'legendary' && !LEGENDARY_IDS.includes(pokemon.id)) return false;
      if (selectedRarity === 'mythical' && !MYTHICAL_IDS.includes(pokemon.id)) return false;
      if (selectedRarity === 'baby' && !BABY_IDS.includes(pokemon.id)) return false;

      if (selectedForm && !pokemon.name.includes(`-${selectedForm}`)) return false;

      return true;
    });
  }, [allPokemons, selectedType1, type1FilteredNames, selectedType2, type2FilteredNames, selectedRegion, selectedRarity, selectedForm]);

  const suggestions = useMemo(() => {
    if (!inputText) return [];
    const term = inputText.toLowerCase().trim();
    const isIdSearch = !isNaN(Number(term)) && term !== '';

    return baseFilteredPokemons.filter(pokemon => {
      if (isIdSearch) return pokemon.id === Number(term);
      return pokemon.name.includes(term);
    }).map(p => p.name).slice(0, 8);
  }, [baseFilteredPokemons, inputText]);

  const filteredNames = useMemo(() => {
    if (!searchTerm) {
      return baseFilteredPokemons
        .filter(p => selectedForm ? true : p.id < 10000)
        .map(p => p.name);
    }
    
    const term = searchTerm.toLowerCase().trim();
    const isIdSearch = !isNaN(Number(term)) && term !== '';

    return baseFilteredPokemons.filter(pokemon => {
      if (isIdSearch) return pokemon.id === Number(term);
      return pokemon.name.includes(term);
    }).map(p => p.name);
  }, [baseFilteredPokemons, searchTerm, selectedForm]);

  return {
    filteredNames,
    suggestions, 
    filters: {
      inputText, setInputText,
      searchTerm, setSearchTerm,
      selectedType1, setSelectedType1, 
      selectedType2, setSelectedType2, 
      selectedRegion, setSelectedRegion,
      selectedRarity, setSelectedRarity,
      selectedForm, setSelectedForm
    }
  };
}