import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountriesList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		);

	const countries = cities.reduce((arr, city, index) => {
		if (!arr.some((el) => el.country === city.country))
			return [
				...arr,
				{
					id: index,
					country: city.country,
					emoji: city.emoji,
					date: city.date,
				},
			];
		else return arr;
	}, []);

	return (
		<ul className={styles.countriesList}>
			{countries.map((country) => (
				<CountryItem
					country={country}
					key={country.country}
				/>
			))}
		</ul>
	);
}

export default CountriesList;
