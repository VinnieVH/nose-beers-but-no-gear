import type { TableProps } from '../../shared/types'

const Table = ({ data, columns, emptyMessage = "No data available", className = '' }: TableProps) => {
  return (
    <div className={`bg-white dark:bg-pandaria-dark rounded-lg overflow-hidden border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pandaria-paper dark:bg-pandaria-dark/80">
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-pandaria-primary/10 dark:divide-pandaria-primary/20">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-pandaria-paper dark:hover:bg-pandaria-primary/10 transition-colors duration-200"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : <span className="text-sm text-pandaria-dark dark:text-pandaria-light/80">
                          {String(row[column.key] ?? '')}
                        </span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-8 text-pandaria-dark/50 dark:text-pandaria-light/50">
          {emptyMessage}
        </div>
      )}
    </div>
  )
}

export default Table 