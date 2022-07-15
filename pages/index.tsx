import { trpc } from '../utils/trpc';

const QuestionCreator: React.FC = () => {
	const client = trpc.useContext();

	const { mutate } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries('questions.get-all');
		},
	});

	return (
		<input
			className='border-2'
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					console.log('enter!!!', event.currentTarget.value);

					mutate({ question: event.currentTarget.value });

					event.currentTarget.value = '';
				}
			}}
		></input>
	);
};

const Home = () => {
	const { data, isLoading } = trpc.useQuery(['questions.get-all']);

	if (isLoading || !data) return <div>Loading...</div>;

	console.log(data);

	return (
		<div className='p-6 flex flex-col'>
			<h1 className='text-3xl font-bold text-center'>Questions</h1>
			{data.map((question) => {
				return (
					<div className='text-2xl font-bold' key={question.id}>
						{question.question}
					</div>
				);
			})}
			<QuestionCreator />
		</div>
	);
};

export default Home;
