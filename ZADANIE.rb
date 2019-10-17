# The same Brief Example as found in section 1.3 of
# glpk-4.44/doc/glpk.pdf.
#
# maximize
#   z = 10 * x1 + 24 * x2 + 12 * x3
#
# subject to
#   p: 5 * x1 + 3 * x2 + 0 * x3 <= 3600
#   q: 1 * x1 + 2 * x2 + 4 * x3 <= 4800
# 
#
# where all variables are non-negative
#   x1 >= 0, x2 >= 0, x3 >= 0
#
m = Cbc::Model.new
x1, x2, x3 = m.int_var_array(3, 0..Cbc::INF)

m.maximize(10 * x1 + 24 * x2 + 12 * x3)


m.enforce(5 * x1 + 3 * x2 + 0 * x3 <= 3600)
m.enforce(1 * x1 + 2 * x2 + 4* x3 <= 4800)

p = m.to_problem

p.solve

if ! p.proven_infeasible?
  puts "x1 = #{p.value_of(x1)}"
  puts "x2 = #{p.value_of(x2)}"
  puts "x3 = #{p.value_of(x3)}"
end 