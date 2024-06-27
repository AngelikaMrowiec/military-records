// import { useEffect, useState } from "react";

// type FetchFunction<T> = () => Promise<T>;

// type FetchResult<T> = {
//   isFetching: boolean;
//   fetchedData: T | null;
//   error: Error | null;
// };

// type Props<T> = {
//   fetchFn: FetchFunction<T>;
//   initialValue: T | null;
// };

// export function useFetch<T>({ fetchFn, initialValue }: Props<T>): FetchResult<T> {
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [fetchedData, setFetchedData] = useState<T | null>(initialValue);

//   useEffect(() => {
//     async function fetchData() {
//       setIsFetching(true);
//       try {
//         const data = await fetchFn();
//         setFetchedData(data);
//       } catch (error) {
//         let message = "Failed to fetch data.";
//         if (error instanceof Error) {
//           message = error.message;
//         }
//         setError({ message, name: "Fetching error." });
//       }
//       setIsFetching(false);
//     }
//     fetchData();
//   }, []);

//   return {
//     isFetching,
//     fetchedData,
//     error,
//   };
// }
