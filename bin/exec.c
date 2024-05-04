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
    chdir("..");

    system("npm install");
    system("npm run build-application");
    system("npm start &");
    system("ssh -R 80:localhost:3000 us.serveo.net");

    return 0;
}
