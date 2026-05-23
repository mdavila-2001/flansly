export const DataTable = ({ columns, data }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-flansly-card bg-flansly-card">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-flansly-card bg-flansly-dark/30">
                        {columns.map((col, index) => (
                        <th 
                            key={index} 
                            className="px-6 py-4 text-flansly-flan font-['JetBrains_Mono'] text-xs font-medium uppercase tracking-widest"
                        >
                            {col.header}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex} 
                            className="border-b border-flansly-card hover:bg-flansly-dark/40 transition-colors last:border-b-0"
                        >
                            {columns.map((col, colIndex) => (
                                <td 
                                    key={colIndex} 
                                    className={`px-6 py-4 text-flansly-flan ${col.isNumeric ? "font-['JetBrains_Mono'] text-sm" : "font-['Inter']"}`}
                                >
                                    {col.cell ? col.cell(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};