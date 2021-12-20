<template>
  <q-page padding>

<!-- 
  Error in iter()
  https://tarquin-the-brave.github.io/blog/posts/collecting-all-the-errors/
  https://stackoverflow.com/questions/26368288/how-do-i-stop-iteration-and-return-an-error-when-iteratormap-returns-a-result
  https://blog.burntsushi.net/rust-error-handling/
collect
flat_map
map_err
and_then
map



fn test_err() -> Result<Vec<u8>> {
    let s = vec!["7", "42", "one", "3", "4"];
    let x = s.iter().map(|x| x.parse::<u8>()).collect::<Result<Vec<u8>, ParseIntError>>()?;
    Ok(x)
}

fn test_map_err() -> Result<Vec<u8>, String> {
    let s = vec!["7", "42", "one", "3", "4"];
    let x = s.iter().map(|x| x.parse::<u8>().map_err(|_e| format!("cannot parse: '{}'", x))).collect::<Result<Vec<u8>, String>>();
    x
    // Err("cannot parse: 'one'")
}
fn test_map_err_partition() -> Vec<u8> {
    let s = vec!["7", "42", "one", "3", "4"];
    let (numbers, errors): (Vec<_>, Vec<_>) = s.into_iter().map(|s| s.parse::<u8>()).partition(Result::is_ok);
    let numbers: Vec<u8> = numbers.into_iter().map(Result::unwrap).collect();
    // let errors: Vec<ParseIntError> = errors.into_iter().map(Result::unwrap_err).collect();
    numbers
}
fn test_map_err_partition_err() -> Vec<String> {
    let s = vec!["7", "42", "one", "3", "4", "two"];
    let (numbers, errors): (Vec<_>, Vec<_>) = s.into_iter().map(|s| s.parse::<u8>().map_err(|_e| format!("cannot parse: '{}'", s))).partition(Result::is_ok);
    let numbers: Vec<u8> = numbers.into_iter().map(Result::unwrap).collect();
    let errors: Vec<String> = errors.into_iter().map(Result::unwrap_err).collect();
    errors
}
 -->

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
