import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
	{
		name: "Jan/2019",
		value: 900
	}
];

const GraficoCarrosAlugados = props => {
	const { width, height } = props;

	return (
		<div>
			<ResponsiveContainer minHeight={100} width="100%">
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						outerRadius={50}
						fill="#8884d8"
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GraficoCarrosAlugados;
