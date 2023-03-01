import { ReactNode, useLayoutEffect, useState } from "react";
import { BrowserHistory } from "history";
import { Router } from "react-router-dom";

type Props = {
	basename?: string;
	children: ReactNode;
	history: BrowserHistory;
}

export const CustomRouter = ({ basename, children, history }: Props) => {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history])

	return (
		<Router
			basename={basename}
			location={state.location}
			navigator={history}
			navigationType={state.action}
		>
			{children}
		</Router>
	);
};