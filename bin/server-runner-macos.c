#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <libgen.h>
#include <limits.h>

int main(int argc, char *argv[]) {
    char path[PATH_MAX];
    if (realpath(argv[0], path) == NULL) {
        perror("realpath");
        return 1;
    }

    char *dir = dirname(path);
    if (chdir(dir) == -1) {
        perror("chdir");
        return 1;
    }
    system("./binaries");

    return 0;
}
